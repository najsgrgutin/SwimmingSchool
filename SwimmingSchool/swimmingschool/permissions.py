from rest_framework.permissions import BasePermission

# permission koji provjerava je li trenutni korisnik trener ili roditelj
# roditelji samo vide obavijesti
# treneri mogu sve


class IsAuthOrCoach(BasePermission):

    def has_permission(self, request, view):
        method = request.method
        user = request.user

        if method == 'GET':
            return user.is_authenticated
        else:
            return user.is_authenticated and user.is_staff

        # if method == 'POST':
        #     return user.is_authenticated and user.has_perm('swimmingschool.add_notification')
        #     return user.is_authenticated and user.is_staff
        # elif method == 'PATCH':
        #     return user.is_authenticated and user.has_perm('swimmingschool.change_notification')
        # elif method == 'DELETE':
        #     return user.is_authenticated and user.has_perm('swimmingschool.delete_notification')
        # else:
        #     return user.is_authenticated
