from rest_framework.routers import DefaultRouter
from login.api.views import ProfessorViewSet

router = DefaultRouter()
router.register(r'professor', ProfessorViewSet, basename='professor')

urlpatterns = router.urls