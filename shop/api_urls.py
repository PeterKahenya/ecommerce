from django.contrib import admin
from django.urls import path,re_path,include
from django.contrib.auth.models import User
from .viewsets.products import AllProductsListMixin,ProductDetailList,ProductDetailDetail


urlpatterns = [
    path('products',AllProductsListMixin.as_view()),
    path('products/details',ProductDetailList.as_view(),name="product-details"),
    path('products/details/<uuid:pk>',ProductDetailDetail.as_view(),name="product-detail"),


]