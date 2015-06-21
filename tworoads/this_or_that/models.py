from django.db import models
from django.db.models import Sum,Avg
import math
import ast
import json

class Strategy(models.Model):
    strategyName = models.CharField(max_length=10)
    
    def __unicode__(self):
        return self.strategyName
        
    def getNetReturn(self):
    	s = Data.objects.filter(strategyID=self.id).aggregate(Sum('logReturn'))
    	nr = float(((math.exp(s['logReturn__sum']))-1)*100)
    	return nr  
	
    def getAnnualizedReturn(self):
    	a = Data.objects.filter(strategyID=self.id).aggregate(Avg('logReturn'))
    	ar = float(((math.exp(252*a['logReturn__avg']))-1)*100)
    	return ar
		
    def getMaxDrawdown(self):
    	data = Data.objects.filter(strategyID=self.id)
    	prev = 1
    	maxOnleft = 0
    	maxDiff = 0
    	for d in data:
            this = prev*math.exp(d.logReturn)
            maxOnleft = max(maxOnleft,prev)
            maxDiff = max(maxDiff, maxOnleft-this)
            prev = this
    	return maxDiff     	
    	  

class Data(models.Model):
    strategyID = models.ForeignKey(Strategy)
    date = models.DateField()
    logReturn = models.FloatField()
    
    class Meta:
        #abstract = True
        unique_together = ('strategyID', 'date')
        ordering = ['date']
        
    def __unicode__(self):
        'StrategyID: %s, Date: %s, Log Return: %f' % (self.strategyID.strategyName, str(self.date), self.logReturn)
        
    def to_json(self):
        return {'sID':self.id, 'date':str(self.date), 'log_return':self.logReturn}
        
class SeparatedValuesField(models.TextField):
    __metaclass__ = models.SubfieldBase

    def __init__(self, *args, **kwargs):
        self.token = kwargs.pop('token', ',')
        super(SeparatedValuesField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if not value: return
        if isinstance(value, list):
            return value
        return value.split(self.token)

    def get_db_prep_value(self, value, connection, prepared=False):
        if not value: return
        assert(isinstance(value, list) or isinstance(value, tuple))
        return self.token.join([unicode(s) for s in value])

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)

class User(models.Model):
	username = models.CharField(max_length=200)
	age = models.IntegerField()
	income = models.DecimalField(max_digits=15, decimal_places=2)
	riskAppetite = models.DecimalField(max_digits=4, decimal_places=2)
	savings = models.DecimalField(max_digits=4, decimal_places=2)
	stratChoiceList = SeparatedValuesField()
	
	def __unicode__(self):
		return 'username: %s, age: %u, income: %d, riskAppetite: %d, savings: %d' % (self.username, self.age, self.income, self.riskAppetite, self.savings)


class Selects(models.Model):
	sID = models.ForeignKey(Strategy)
	uID = models.ForeignKey(User)
	def __unicode__(self):
		return 'sID: %s, uID: %s' % (self.sID.strategyName, self.uID.username)
