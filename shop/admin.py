from django.contrib import admin
from .models import Product,ProductDetail,Category,Supplier,Tag


admin.site.register(Product)
admin.site.register(ProductDetail)
admin.site.register(Category)
admin.site.register(Supplier)
admin.site.register(Tag)
