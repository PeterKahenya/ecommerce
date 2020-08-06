from django.contrib import admin
from django.urls import path,re_path,include
from django.contrib.auth.models import User
from .viewsets.products import AllProductsListView,ProductDetailView


urlpatterns = [
    path('products',AllProductsListView.as_view()),
    path('products/<uuid:pk>/details',ProductDetailView.as_view(),name="product-details"),
]