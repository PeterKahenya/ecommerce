from django.contrib import admin
from django.urls import path,re_path,include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .home import HomeView
from .terms import TermsView
from .help import HelpView



urlpatterns = [
    path('',HomeView.as_view()),
    path('terms',TermsView.as_view()),
    path('help',HelpView.as_view()),
    path('api/shop/', include('shop.api_urls')),
    path('api/customers/', include('customers.api_urls')),
    path('api/experts/', include('experts.api_urls')),
    path('api/calls/', include('calls.api_urls')),    
    path('admin/', admin.site.urls),
    re_path(r'^api-auth/', include('rest_framework.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
