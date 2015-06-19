from django.shortcuts import render, get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, link, action
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
import json


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
