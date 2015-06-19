from django.conf.urls import patterns, url

from this_or_that import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^(?P<username>\w+)/check_login/$', views.check_login, name='check_login'),
    url(r'^(?P<username>\w+)/check_signup/$', views.check_signup, name='check_signup'),
    url(r'^(?P<username>\w+)/get_user_strategies/$', views.get_user_strategies, name='get_user_strategies'),
    url(r'^(?P<strategyname>\w+)/get_strategy_data/$', views.get_strategy_data, name='get_strategy_data'),
    url(r'^(?P<username>\w+)/(?P<selected>\w+)/get_next_strategies/$', views.get_next_strategies, name='get_next_strategies')
)
