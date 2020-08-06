from django.contrib import admin
from .models import Product,DetailName,ProductDetail,Category,Supplier,Tag,Review


admin.site.register(Product)
admin.site.register(DetailName)
admin.site.register(Review)
admin.site.register(ProductDetail)
admin.site.register(Category)
admin.site.register(Supplier)
admin.site.register(Tag)
