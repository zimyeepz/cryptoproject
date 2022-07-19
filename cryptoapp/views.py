from cgitb import reset
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'cryptoapp/index.html',{'data':[]})

def indexold(request):
    return render(request, 'cryptoapp/index2.html',{'data':[]})