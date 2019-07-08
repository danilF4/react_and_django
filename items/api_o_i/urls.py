from django.urls import path, include
from .views import OrderItemViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', OrderItemViewSet, base_name='articles')
urlpatterns = router.urls