from django.shortcuts import render, get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, link, action
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
import json

@api_view(['GET', 'POST', ])
def get_strategy_data(request, strategyname):
	print 666666
	print strategyname
	'''
	TODO: return all log_returns, netReturn, annualizedReturn, Maxdrawdown for strategyname from data table 
	'''
	log_returns = [66.25, 333, 333, 1, 1234.5]
	netReturn = 10
	annualizedReturn = 18
	maxDrawdown = 23
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
	return Response({'firstID': '5432', 'secondID': '2345'})


@api_view(['GET', 'POST', ])
def get_user_strategies(request, username):
	print 7654321
	print username
	'''
	TODO: return first two stratgies from stratChoiceList 
	'''
	return Response({'firstID': '1234', 'secondID': '5678'})

@api_view(['GET', 'POST', ])
def check_login(request, username):
	print 1111111
	print username
	'''
	TODO: Login check if true send true, username else send false, blank
	'''
	return Response({'loginStatus': True, 'username': username})
    

@api_view(['GET', 'POST', ])
def check_signup(request, username):
	print 2222
	print username
	age = request.DATA['age'];
	income = request.DATA['income'];
	riskAppetite = request.DATA['riskAppetite'];
	savings = request.DATA['savings'];
	print age
	print income
	print riskAppetite
	print savings
	'''
	TODO: Signup check if true send true, username else send false, blank
	'''
	return Response({'loginStatus': True, 'username': username})
    
        
def index(request):
	return render(request, "this_or_that/index.html")
