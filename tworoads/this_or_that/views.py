from django.shortcuts import render, get_object_or_404
from django.core import serializers
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, link, action
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from this_or_that.models import Strategy, Data, User, Selects
import json

@api_view(['GET', 'POST', ])
def get_strategy_data(request, strategyname):
	print 666666
	print strategyname
	'''
	TODO: return all log_returns, netReturn, annualizedReturn, Maxdrawdown for strategyname from data table 
	'''
	log_returns = []
	#serialized_data = serializers.serialize('json', Data.objects.filter(strategyID__strategyName=strategyname))
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
	print 555555
	print username
	print selected
	'''
	TODO: Push into selects (username, selected), 
	push into stratchoicelist the selected strategy
	return next two stratgies from stratChoiceList 
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
	print 7654321
	print username
	'''
	TODO: return first two stratgies from stratChoiceList 
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
	print 1111111
	print username
	'''
	TODO: Login check if true send true, username else send false, blank
	'''
	if(User.objects.filter(username=username).count() == 0):
		return Response({'loginStatus': False, 'username': ''})
	else:
		return Response({'loginStatus': True, 'username': username})

@api_view(['GET', 'POST', ])
def check_signup(request, username):
	print 2222
	age = request.DATA['age'];
	income = request.DATA['income'];
	riskAppetite = request.DATA['riskAppetite'];
	savings = request.DATA['savings'];
	print username
	print age
	print income
	print riskAppetite
	print savings
	'''
	TODO: Signup check if true send true, username else send false, blank
	'''
	if(User.objects.filter(username=username).count() != 0):
		return Response({'loginStatus': False, 'username': ''})
	else:
		all_strategies = list(Strategy.objects.values_list('strategyName',flat=True).all())
		print all_strategies
		u = User(username=username, 
				age=age, 
				income=income, 
				riskAppetite=riskAppetite, 
				savings=savings, 
				stratChoiceList=all_strategies)
		u.save()
		return Response({'loginStatus': True, 'username': username})
    
        
def index(request):
	return render(request, "this_or_that/index.html")
