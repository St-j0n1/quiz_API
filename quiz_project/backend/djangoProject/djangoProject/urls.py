# for media
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view as swagger_get_schema_view
from drf_yasg import openapi

from django.contrib import admin
from django.urls import path, include, re_path

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Quiz API",
        default_version='1.0.0',
        description='API documentation for Quiz API'
    ),
    public=True
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user_app.urls'), name='user_app'),
    path('swagger/schema/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
