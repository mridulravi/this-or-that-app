from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from this_or_that.models import Strategy, Data, User, Selects

@api_view(['GET', 'POST', ])
def get_strategy_data(request, strategyname):
	'''
	Takes as parameter a strategyName=strategyname and returns:
		all log_returns, 
		netReturn, 
		annualizedReturn, 
		Maxdrawdown 
		for strategyname from data table 
	'''
	log_returns = []
	data = Data.objects.filter(strategyID__strategyName=strategyname)
	for d in data:
		log_returns.append({
            "date": d.date,
            "value": d.logReturn
        })
	strategy = get_object_or_404(Strategy, strategyName=strategyname)
	netReturn = strategy.getNetReturn()
	annualizedReturn = strategy.getAnnualizedReturn()
	maxDrawdown = strategy.getMaxDrawdown()
	return Response({'log_returns': log_returns, 'netReturn': netReturn, 'annualizedReturn': annualizedReturn, 'maxDrawdown': maxDrawdown})

@api_view(['GET', 'POST', ])
def get_next_strategies(request, username, selected):
	'''
	Takes as parameters: 
		username of the user
		strategyName=selected 
	Returns:
		next two stratgies from stratChoiceList of user=username
	Also: 
		Push into selects (username, selected), 
		Pop the first two strategies from stratChoiceList of the user
		Push the selected strategy at the end of stratchoicelist of the user
	'''
	user = get_object_or_404(User, username=username)
	strategy = get_object_or_404(Strategy, strategyName=selected)
	stratChoiceList = user.stratChoiceList
	l = len(stratChoiceList)
	if(l == 1):
		firstID = stratChoiceList[0]
		secondID = stratChoiceList[0]
		return Response({'firstID': firstID, 'secondID': secondID})
	elif(l == 2):
		stratChoiceList.append(selected)
		stratChoiceList.pop(0)
		stratChoiceList.pop(0)
		firstID = stratChoiceList[0]
		secondID = stratChoiceList[0]
	else:
		stratChoiceList.append(selected)
		stratChoiceList.pop(0)
		stratChoiceList.pop(0)
		firstID = stratChoiceList[0]
		secondID = stratChoiceList[1]
	u = User(id = user.id, 
			username=user.username, 
			age=user.age, 
			income=user.income, 
			riskAppetite=user.riskAppetite, 
			savings=user.savings, 
			stratChoiceList=stratChoiceList)
	u.save()
	s = Selects(sID = strategy, uID = user)
	s.save()
	return Response({'firstID': firstID, 'secondID': secondID})


@api_view(['GET', 'POST', ])
def get_user_strategies(request, username):
	'''
	Takes as parameter the username of the just logged in user
	and returns first two stratgies from stratChoiceList of this user
	(does not POP/REMOVE, only returns) 
	'''
	user = get_object_or_404(User, username=username)
	stratChoiceList = user.stratChoiceList
	if(len(stratChoiceList)<2):
		return Response({'firstID': stratChoiceList[0], 'secondID': stratChoiceList[0]})
	firstID = stratChoiceList[0]
	secondID = stratChoiceList[1]
	return Response({'firstID': firstID, 'secondID': secondID})

@api_view(['GET', 'POST', ])
def check_login(request, username):
	'''
	Login check is successful 
		Return (true, username)
	else 
		Return (false, blank)
	'''
	if(User.objects.filter(username=username).count() == 0):
		return Response({'loginStatus': False, 'username': ''})
	else:
		return Response({'loginStatus': True, 'username': username})

@api_view(['GET', 'POST', ])
def check_signup(request, username):
	'''
	If Signup check is successful 
		Return (true, username)
	else 
		Return (false, blank)
	'''
	age = float(request.DATA['age']);
	income = float(request.DATA['income']);
	riskAppetite = float(request.DATA['riskAppetite']);
	savings = float(request.DATA['savings']);
	
	if(User.objects.filter(username=username).count() != 0):
		return Response({'loginStatus': False, 'username': ''})
	else:
		all_strategies = Strategy.objects.all()
		####### Construction of preference order of strategies for this user ######
		preference_order = []
		for s in all_strategies:
			users_selected = Selects.objects.filter(sID = s)
			N = users_selected.count()
			if(N == 0):
				preference_order.append((s.strategyName, float("inf")))
				continue
			abs_age_diff = 0
			abs_income_diff = 0
			abs_riskAppetite_diff = 0
			abs_savings_diff = 0
			
			for u in users_selected:
				abs_age_diff += abs(age - float(u.uID.age))
				abs_income_diff += abs(income - float(u.uID.income))
				abs_riskAppetite_diff += abs(riskAppetite - float(u.uID.riskAppetite))
				abs_savings_diff += abs(savings - float(u.uID.savings))
				
			avg_age_diff = abs_age_diff/N
			avg_income_diff = abs_income_diff/N
			avg_riskAppetite_diff = abs_riskAppetite_diff/N
			avg_savings_diff = abs_savings_diff/N
			
			w1 = w2 = w3 = w4 = 0.25
			w = w1*avg_age_diff + w2*avg_income_diff +  w3*avg_riskAppetite_diff +	w4*avg_savings_diff
			preference_order.append((s.strategyName, w))
		
		preference_order.sort(key=lambda tup: tup[1])
		####### Construction of stratChoiceList of the user based on preference order ######
		push_order = []
		i=0
		j=len(preference_order)-1
		while(i<j):
			push_order.append(preference_order[i][0])
			push_order.append(preference_order[j][0])
			i += 1
			j -= 1
		if(i==j):
			push_order.append(preference_order[i][0])
		############### Database insertion ###############
		u = User(username=username, 
				age=age, 
				income=income, 
				riskAppetite=riskAppetite, 
				savings=savings, 
				stratChoiceList=push_order)
		u.save()
		return Response({'loginStatus': True, 'username': username})
    
        
def index(request):
	return render(request, "this_or_that/index.html")
