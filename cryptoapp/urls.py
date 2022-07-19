from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cm', views.indexold, name='indexold'),
]