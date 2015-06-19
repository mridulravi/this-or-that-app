from django.conf.urls import patterns, url

from this_or_that import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^(?P<username>\w+)/check_login/$', views.check_login, name='check_login'),
    url(r'^(?P<username>\w+)/check_signup/$', views.check_signup, name='check_signup'),
)
