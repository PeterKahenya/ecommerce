from shop.models import Product,ProductDetail
from shop.serializers.products import ProductSerializer,ProductDetailSerializer
from rest_framework import mixins
from rest_framework import generics

class AllProductsListMixin(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class ProductDetailList(generics.ListCreateAPIView):
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer


class ProductDetailDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer