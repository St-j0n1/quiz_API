# for media
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user/', include('user_app.urls'), name='user_app'),
    path('api/quiz/', include('quiz_app.urls'), name='quiz_app'),

    path('api/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path(
      'api/docs/',
      SpectacularSwaggerView.as_view(url_name='api-schema'),
      name='api-docs',
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
