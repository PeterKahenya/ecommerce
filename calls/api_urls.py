from django.urls import path,re_path,include
from .views import APICallView

urlpatterns=[
    path("start_call",APICallView.as_view())
]