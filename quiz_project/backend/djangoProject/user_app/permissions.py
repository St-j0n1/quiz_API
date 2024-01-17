from rest_framework.permissions import BasePermission


class IsNotAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is not authenticated
        return not request.user.is_authenticated

