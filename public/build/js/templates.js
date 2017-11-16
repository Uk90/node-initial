//HEAD 
(function(app) {
try { app = angular.module("app"); }
catch(err) { app = angular.module("app", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("../app/index.html","<!DOCTYPE HTML><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Feazo</title><link rel=\"shortcut icon\" href=\"/assets/images/favicon_fe.png\"><link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><!-- inject:css --><!-- endinject --></head><body class=\"main-body\"><ui-view></ui-view><!-- <div layout=\"row\" layout-fill hide show-xl class=\"main-xl-padding\">\n" +
    "          <div flex layout-fill class=\"container-cushion-xl\"></div>\n" +
    "        </div> --><md-progress-circular ng-show=\"isLoading\" md-diameter=\"60\" class=\"loader md-accent md-hue-4\" md-mode=\"indeterminate\"></md-progress-circular><!-- inject:js --><!-- endinject --><script type=\"text/javascript\" src=\"https://wi361.infusionsoft.com/app/webTracking/getTrackingCode\"></script></body></html>")

$templateCache.put("../app/scripts/landing/views/footer.html","<footer flex layout=\"row\" hide><div flex class=\"footer-logo\" hide><a href=\"#\"><img src=\"build/assets/images/footer_logo.png\" alt=\"Logo\"></a></div></footer>")

$templateCache.put("../app/scripts/landing/views/header.html","<div layout=\"row\" flex class=\"header-br-btm bg-light-white\"><div id=\"logoDiv\" layout=\"row\" layout-align=\"center center\" class=\"logo-sec\"><div><a href=\"#\"><img src=\"build/assets/images/logo.png\" alt=\"Logo\"></a></div></div><div flex layout=\"row\" layout-align=\"start center\" class=\"header-br-sec\" layout-wrap><div hide show-gt-xs flex-gt-xs=\"3\" class=\"breadcrumb-sec\"><div class=\"breadcrumb-icon\"></div></div><div flex><div ncy-breadcrumb></div></div><!-- <div class=\"search-container\" flex >\n" +
    "            <div hide show-gt-xs layout=\"row\" layout-align=\"end\" ng-show=\"$state.includes('home');\">\n" +
    "                <md-input-container class=\"header-search-input p-r-15\">\n" +
    "                    <md-icon class=\"material-icons header-search-icon\">search</md-icon>\n" +
    "                    <input name=\"search\" class=\"no-border-width input-font-color width-225\" ng-model=\"userCtrl.searchKey\" ng-keyup=\"userCtrl.searchProject()\" id=\"search\" type=\"text\" placeholder=\"Search\">\n" +
    "                </md-input-container>\n" +
    "            </div>\n" +
    "            <div hide-gt-xs show-xs layout-align=\"center end\" ng-include=\"'../app/scripts/menu/views/xs-menu.html'\"></div>\n" +
    "        </div> --></div></div>")

$templateCache.put("../app/scripts/user/views/change-password.html","<div flex layout=\"row\" class=\"width-height-100 bg-login-img\"><md-content class=\"md-padding bg-initial landing-md-content\" flex layout=\"row\" layout-sm=\"row\" layout-xs=\"column\"><div flex=\"50\" layout-align=\"end\" flex-xs=\"30\" flex-md=\"50\" flex-sm=\"30\" flex-gt-xs=\"40\" layout=\"column\" layout-sm=\"row\" layout-xs=\"row\" class=\"margin-auto\"><div><div class=\"fzbl-text\">Feazo</div><div class=\"fzbl-slogan\">Property Feasibility Analysis System</div></div></div><div flex=\"30\" layout-align=\"start\" flex-xs=\"60\" flex-md=\"40\" flex-sm=\"40\" flex-gt-xs=\"40\" layout=\"column\" class=\"margin-auto\"><md-card class=\"login-panel\"><form id=\"change_password_form\" ng-submit=\"userCtrl.resetPassword(changePasswordForm)\" name=\"changePasswordForm\" class=\"login-form\" novalidate><div flex=\"100\"><md-input-container class=\"width-100 custom-md-input\"><input required name=\"newPassword\" class=\"input-font-color\" ng-model=\"userCtrl.user.password\" type=\"password\" placeholder=\"New password\" ng-pattern=\"userCtrl.passwordPattern\" autofocus><div ng-messages=\"changePasswordForm.newPassword.$error\"><div ng-message=\"required\" ng-show=\"changePasswordForm.newPassword.$error.required\">Please enter your password.</div><div ng-message=\"pattern\" ng-show=\"changePasswordForm.newPassword.$error.pattern\">{{userCtrl.passwordPatternText}}</div></div></md-input-container></div><div flex=\"100\"><md-input-container class=\"width-100 custom-md-input\"><input required name=\"confirmPassword\" class=\"input-font-color\" ng-model=\"userCtrl.user.password_confirmation\" type=\"password\" placeholder=\"Re-type new password\" match-password=\"newPassword\"><div ng-messages=\"changePasswordForm.confirmPassword.$error\"><div ng-message=\"required\" ng-show=\"changePasswordForm.confirmPassword.$error.required\">Please retype the new password..</div><div ng-message=\"passwordMatch\" ng-show=\"changePasswordForm.confirmPassword.$error.passwordMatch\">Your passwords did not match</div></div></md-input-container></div><div flex layout=\"row\"><div flex=\"50\" layout=\"column\" layout-align=\"center start\"><a ui-sref=\"login\" class=\"frgt-pwd\">Back to Login</a></div><div flex=\"50\" layout=\"column\" layout-align=\"center end\"><md-button class=\"md-primary custom-btn-submit text-capitalize login-btn\" type=\"submit\" ng-disabled=\"changePasswordForm.$invalid\">Update</md-button></div></div></form></md-card></div></md-content></div>")

$templateCache.put("../app/scripts/user/views/chart.html","Chart Page")

$templateCache.put("../app/scripts/user/views/employee-list.html","<md-whiteframe class=\"bg-light-white custom-whiteframe\" layout=\"row\" layout-wrap layout-align=\"center center\" flex><div layout=\"row\" flex-xs=\"50\" flex-gt-xs=\"50\"><div class=\"breadcrumb-icon\"></div><div class=\"header-title\">Employee Lists</div></div><div flex layout-fill></div><div flex-xs=\"50\" flex-gt-xs=\"50\"></div></md-whiteframe><div layout=\"row\" layout-align=\"start\" layout-padding layout-wrap ng-init=\"userCtrl.getEmpList()\"><md-content flex layout=\"column\" class=\"full-vers-cont p-40\"><md-card class=\"card-bg-br\"><md-card-title flex layout=\"row\" class=\"secondary-title\"></md-card-title><md-card-content><table class=\"cost-code-table width-perc-100\" cellspacing=\"0\"><thead><tr><th class=\"default-label align-left\">First Name</th><th class=\"default-label align-left\">Last Name</th><th class=\"default-label align-left\">Email</th><th class=\"default-label align-left\">Employee Id</th><th class=\"default-label align-center\">Edit</th><th class=\"default-label align-center\">Delete</th></tr></thead><tbody ng-repeat=\"empList in userCtrl.userList \"><td class=\"align-left\" ng-init=\"isEdit=true\"><md-input-container class=\"fzbl-input width-perc-50\"><input ng-disabled=\"isEdit\" class=\"input-font-color\" ng-model=\"empList.firstname\"></md-input-container></td><td class=\"align-left\"><md-input-container class=\"fzbl-input width-perc-50\"><input ng-disabled=\"isEdit\" class=\"input-font-color\" ng-model=\"empList.lastname\"></md-input-container></td><td class=\"align-left\"><md-input-container class=\"fzbl-input width-perc-80\"><input ng-disabled=\"true\" class=\"input-font-color\" ng-model=\"empList.email\"></md-input-container></td><td class=\"align-left\"><md-input-container class=\"fzbl-input width-perc-50\"><input ng-disabled=\"isEdit\" class=\"input-font-color\" ng-model=\"empList.employeeId\"></md-input-container></td><td class=\"align-center\"><md-icon ng-hide=\"isEdit == false\" ng-click=\"isEdit=false\" class=\"material-icons blue-icon-color\">create</md-icon><md-icon ng-show=\"isEdit == false\" ng-click=\"isEdit=true; userCtrl.updateEmp(empList)\" class=\"material-icons green-icon-color\">done</md-icon><md-icon ng-show=\"isEdit == false\" ng-click=\"isEdit=true\" class=\"material-icons red-icon-color\">clear</md-icon></td><td class=\"align-center\"><md-icon class=\"material-icons red-icon-color\" ng-click=\"userCtrl.deleteEmp($index,empList)\">clear</md-icon></td></tbody></table></md-card-content></md-card></md-content></div>")

$templateCache.put("../app/scripts/user/views/home.html","Home Page")

$templateCache.put("../app/scripts/user/views/login.html","<div flex layout=\"row\" class=\"width-height-100 bg-login-img\"><md-content class=\"md-padding bg-initial landing-md-content\" flex layout=\"row\" layout-sm=\"row\" layout-xs=\"column\"><div flex=\"50\" layout-align=\"end\" flex-xs=\"30\" flex-md=\"50\" flex-sm=\"35\" flex-gt-xs=\"40\" layout=\"column\" layout-sm=\"row\" layout-xs=\"row\" class=\"margin-auto\"><div><div class=\"fzbl-text\">Manique</div><div class=\"fzbl-slogan\">Let Start Node</div></div></div><div flex=\"30\" layout-align=\"start\" flex-xs=\"60\" flex-md=\"40\" flex-sm=\"35\" flex-gt-xs=\"40\" layout=\"column\" class=\"margin-auto\"><md-card class=\"login-panel\"><form id=\"login_form\" ng-submit=\"userCtrl.login(loginForm);\" name=\"loginForm\" class=\"login-form\" novalidate autocomplete=\"false\"><div flex><md-input-container class=\"width-100 custom-md-input\"><input autocomplete=\"false\" required name=\"name\" class=\"no-border-width input-font-color\" ng-model=\"userCtrl.project.projectName\" type=\"name\" placeholder=\"Project Name\" autofocus><div ng-messages=\"loginForm.name.$error\" ng-if=\"loginForm.name.$touched\" class=\"input-messages\"><div ng-message=\"required\" ng-show=\"loginForm.name.$error.required\">Please enter Project Name.</div></div></md-input-container></div><div flex=\"100\"><md-input-container class=\"width-100 custom-md-input\"><input required name=\"projectCode\" class=\"input-font-color\" ng-model=\"userCtrl.project.projectCode\" type=\"text\" placeholder=\"Project Code\" autofocus><div ng-messages=\"loginForm.projectCode.$error\" class=\"input-messages\"><div ng-message=\"required\" ng-show=\"loginForm.projectCode.$error.required\">Please enter your Project Code.</div></div></md-input-container></div><div flex layout=\"row\"><div flex=\"50\" layout=\"column\"><div flex=\"100\"><md-button ng-disabled=\"loginForm.$invalid\" class=\"md-primary custom-btn-submit text-capitalize login-btn\" type=\"submit\" style=\"width:100%\">Add Project</md-button></div></div></div></form></md-card><div flex layout-align=\"center\" layout=\"row\" class=\"new-user m-10\"><div flex=\"50\" layout=\"column\" class=\"m-t-15 color-white new-user-text\">Add a new user?</div><div flex=\"50\" layout=\"column\"><md-button class=\"md-primary custom-btn register-btn text-capitalize\" type=\"submit\" ng-click=\"userCtrl.redirectToRegister();\">Add Employee</md-button></div></div></div></md-content></div>")

$templateCache.put("../app/scripts/user/views/main.html","<!-- <div ng-include=\"'../app/scripts/landing/views/header.html'\"></div> --><div layout-gt-xs=\"row\" layout-xs=\"column\" layout-wrap class=\"main-content horizontal-overflow-hidden fill-blank-space-height\" ng-controller=\"MenuController as menuCtrl\"><div layout=\"column\" hide-xs><div flex class=\"logo-cont\"><a href=\"#\"><img src=\"assets/images/logo.png\" alt=\"Logo\"></a></div><div layout-align=\"end center\" layout-fill id=\"sideMenu\" ng-include=\"'../app/scripts/menu/views/side-menu.html'\" adjust-height></div></div><!-- <div ng-if=\"screenSize >= 600\" ui-view flex layout-fill class=\"container-view fill-blank-space-height\" ng-click=\"menuCtrl.closeToggle();\"></div> --><!-- </div>\n" +
    "\n" +
    "<div layout=\"column\" class=\"mobile-header\" hide-gt-xs ng-controller=\"MenuController as menuCtrl\"> --><div layout=\"row\" class=\"mobile-header bg-white-color\" hide-gt-xs><div flex=\"100\" layout=\"row\"><md-toolbar class=\"mobile custom-whiteframe page-title-sec bg-light-white\" hide-gt-xs><div class=\"md-toolbar-tools\"><md-button class=\"md-icon-button\" aria-label=\"Side Panel\" ng-click=\"userCtrl.openSideNavPanel()\"><md-icon class=\"md-default-theme\" class=\"material-icons\">menu</md-icon></md-button><div flex=\"20\" hide-gt-xs class=\"logo-cont\"><a href=\"#\"><img src=\"assets/images/logo.png\" alt=\"Logo\" width=\"50\" height=\"24\"></a></div><span flex></span><md-button class=\"md-icon-button\" aria-label=\"Search\" ng-click=\"userCtrl.redirectToHome()\"><md-icon class=\"material-icons input-font-color\">home</md-icon></md-button></div></md-toolbar></div></div><div ui-view flex layout-fill class=\"container-view fill-blank-space-height\" ng-click=\"menuCtrl.closeToggle();\"></div><md-sidenav class=\"md-sidenav-left mobile-sidemenu md-whiteframe-z2\" md-component-id=\"left\" hide-gt-xs><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools bg-white-color\"><div flex class=\"logo-cont\"><a href=\"#\"><img src=\"assets/images/logo.png\" class=\"sidemenu-logo\" alt=\"Logo\"></a></div><span flex></span><md-button class=\"md-icon-button\" aria-label=\"Close Side Panel\" ng-click=\"userCtrl.closeSideNavPanel()\"><md-icon class=\"md-default-theme\" class=\"material-icons\" style=\"color: gray !important;\n" +
    "  font-size: 20px !important\">close</md-icon></md-button></div></md-toolbar><md-content layout-padding=\"\" class=\"padding-0\"><div class=\"padding-0\" layout-align=\"end center\" layout-fill id=\"sideMenu\" ng-include=\"'../app/scripts/menu/views/side-menu.html'\" adjust-height></div></md-content></md-sidenav></div><div ng-include=\"'../app/scripts/landing/views/footer.html'\"></div>")

$templateCache.put("../app/scripts/user/views/note.html","Note Page")

$templateCache.put("../app/scripts/user/views/profile.html","<form id=\"profile_form\" name=\"profileForm\" ng-submit=\"profileCtrl.saveProfile(profileForm)\" ng-init=\"profileCtrl.getUserProfile()\" novalidate><md-whiteframe class=\"page-title-sec\" layout=\"row\" layout-wrap layout-align=\"center center\" flex><div flex-xs=\"30\" flex-gt-xs=\"45\"><span class=\"header-title\">My Profile</span></div><div flex-xs=\"70\" flex-gt-xs=\"45\"><div layout=\"row\" layout-align=\"end\"><md-button class=\"md-primary blue-btn input-font-color text-capitalize\" ng-click=\"changePassword();\">Change Credential</md-button><md-button class=\"md-primary blue-btn input-font-color text-capitalize\" ng-click=\"saveProfile();\">Save</md-button></div></div></md-whiteframe><div layout=\"row\" layout-align=\"center\" layout-padding layout-wrap class=\"container-bg\"><md-card class=\"border-radius-8 card-br\" flex-xs=\"90\" flex-gt-xs=\"35\" layout-padding><div class=\"m-25\"><div flex><h5>General Information</h5></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"firstName\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.firstName\" type=\"text\" placeholder=\"First name\"><div ng-messages=\"profileForm.firstName.$error\"><div ng-message=\"required\" ng-show=\"profileForm.firstName.$error.required\">Please enter your First Name.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"lastName\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.lastName\" type=\"text\" placeholder=\"Last name\"><div ng-messages=\"profileForm.lastName.$error\"><div ng-message=\"required\" ng-show=\"profileForm.lastName.$error.required\">Please enter your Last Name.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"company\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.company\" type=\"text\" placeholder=\"Company\"><div ng-messages=\"profileForm.company.$error\"><div ng-message=\"required\" ng-show=\"profileForm.company.$error.required\">Please enter your Company Name.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"phone\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.phone\" placeholder=\"Phone\" ng-pattern=\"/^[0-9]{10}$/\"><div ng-messages=\"profileForm.phone.$error\"><div ng-message=\"required\" ng-show=\"profileForm.phone.$error.required\">Please enter your Phone Number.</div><div ng-message=\"pattern\" ng-show=\"profileForm.phone.$error.pattern\">Please enter a valid phone number.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"email\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.email\" placeholder=\"Email Address\" minlength=\"10\" maxlength=\"100\" ng-pattern=\"/^.+@.+\\..+$/\" disabled=\"disabled\"><div ng-messages=\"profileForm.email.$error\"><div ng-message-exp=\"['required', 'minlength', 'maxlength', 'pattern']\">Your email must be between 10 and 100 characters long and look like an e-mail address.</div></div></md-input-container></div></div></md-card><div hide show-gt-xs flex=\"5\"></div><md-card class=\"border-radius-8 card-br\" flex-xs=\"90\" flex-gt-xs=\"35\" layout-padding><div class=\"m-25\"><div flex><h5>Billing Information</h5></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"address1\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.address1\" type=\"text\" placeholder=\"Address Line1\"><div ng-messages=\"profileForm.address1.$error\"><div ng-message=\"required\" ng-show=\"profileForm.address1.$error.required\">Please enter the Billing Addres Line1.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"address2\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.address2\" type=\"text\" placeholder=\"Address Line2\"><div ng-messages=\"profileForm.address2.$error\"><div ng-message=\"required\" ng-show=\"profileForm.address2.$error.required\">Please enter the Billing Addres Line2.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"city\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.city\" type=\"text\" placeholder=\"City\"><div ng-messages=\"profileForm.city.$error\"><div ng-message=\"required\" ng-show=\"profileForm.city.$error.required\">Please enter the Billing City.</div></div></md-input-container></div><div flex layout=\"row\"><md-input-container class=\"width-100 custom-md-input\" flex=\"50\"><label>State</label><md-select name=\"state\" ng-model=\"profileCtrl.user.state\" class=\"no-border-width input-font-color\" required><md-option ng-repeat=\"state in states\" value=\"{{$index+1}}\">{{state}}</md-option></md-select><div ng-messages=\"profileForm.state.$error\"><div ng-message=\"required\" ng-show=\"profileForm.state.$error.required\">Please select the Billing State.</div></div></md-input-container><div flex=\"5\"></div><md-input-container flex=\"50\" class=\"width-100 custom-md-input\"><input required name=\"postalCode\" class=\"no-border-width input-font-color\" ng-model=\"profileCtrl.user.postalCode\" type=\"text\" placeholder=\"Postal Code\" ng-pattern=\"/^[0-9]{6}$/\" md-maxlength=\"6\"><div ng-messages=\"profileForm.postalCode.$error\"><div ng-message=\"required\" ng-show=\"profileForm.postalCode.$error.required\">Please enter the Billing Postal Code.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><label>Country</label><md-select name=\"country\" ng-model=\"profileCtrl.user.country\" class=\"no-border-width input-font-color\" required><md-option ng-repeat=\"country in countries\" value=\"{{$index+1}}\">{{country}}</md-option></md-select><div ng-messages=\"profileForm.country.$error\"><div ng-message=\"required\" ng-show=\"profileForm.country.$error.required\">Please select the Billing Country.</div></div></md-input-container></div></div></md-card></div></form>")

$templateCache.put("../app/scripts/user/views/project-list.html","<md-whiteframe class=\"bg-light-white custom-whiteframe\" layout=\"row\" layout-wrap layout-align=\"center center\" flex><div layout=\"row\" flex-xs=\"50\" flex-gt-xs=\"50\"><div class=\"breadcrumb-icon\"></div><div class=\"header-title\">Project Lists</div></div><div flex layout-fill></div><div flex-xs=\"50\" flex-gt-xs=\"50\"></div></md-whiteframe><div layout=\"row\" layout-align=\"start\" layout-padding layout-wrap ng-init=\"userCtrl.getProjectList()\"><md-content flex layout=\"column\" class=\"full-vers-cont p-40\"><md-card class=\"card-bg-br\"><md-card-title flex layout=\"row\" class=\"secondary-title\"></md-card-title><md-card-content><table class=\"cost-code-table width-perc-100\" cellspacing=\"0\"><thead><tr><th class=\"default-label align-left\">Project Name</th><th class=\"default-label align-left\">Project Code</th><th class=\"default-label align-left\">View</th></tr></thead><tbody ng-repeat=\"project in userCtrl.projectList \"><td class=\"align-left\" ng-init=\"isEdit=true\"><md-input-container class=\"fzbl-input width-perc-50\"><input ng-disabled=\"isEdit\" class=\"input-font-color\" ng-model=\"project.projectName\"></md-input-container></td><td class=\"align-left\"><md-input-container class=\"fzbl-input width-perc-50\"><input ng-disabled=\"isEdit\" class=\"input-font-color\" ng-model=\"project.projectCode\"></md-input-container></td><td class=\"align-center\"><md-button class=\"md-primary custom-btn-submit text-capitalize login-btn\" type=\"submit\" style=\"width: 100%\">View</md-button></td></tbody></table></md-card-content></md-card></md-content></div>")

$templateCache.put("../app/scripts/user/views/register.html","<div flex layout=\"row\" class=\"width-height-100 bg-login-img\" layout-align=\"end\"><md-content class=\"md-padding bg-initial landing-md-content\" flex layout=\"row\" layout-sm=\"row\" layout-xs=\"column\"><div flex=\"30\" flex-xs=\"30\" flex-md=\"50\" flex-sm=\"30\" flex-gt-xs=\"40\" layout=\"column\" layout-sm=\"row\" layout-xs=\"row\" class=\"margin-auto\"><div><div class=\"fzbl-text\">Manique</div><div class=\"fzbl-slogan\">Let Start Node</div></div></div><div flex=\"30\" flex-xs=\"100\" flex-md=\"40\" flex-sm=\"50\" flex-gt-xs=\"40\" layout=\"column\" class=\"margin-auto\"><md-card class=\"login-panel\" flex><form id=\"login_form\" ng-submit=\"userCtrl.register(registerForm);\" name=\"registerForm\" class=\"login-form\" novalidate><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"firstName\" class=\"no-border-width input-font-color\" ng-model=\"userCtrl.user.firstName\" type=\"text\" placeholder=\"First name\"><div ng-messages=\"registerForm.firstName.$error\"><div ng-message=\"required\" ng-show=\"registerForm.firstName.$error.required\">Please enter your First name.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"lastName\" class=\"no-border-width input-font-color\" ng-model=\"userCtrl.user.lastName\" type=\"text\" placeholder=\"Last name\"><div ng-messages=\"registerForm.lastName.$error\"><div ng-message=\"required\" ng-show=\"registerForm.lastName.$error.required\">Please enter your Last name.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"email\" class=\"no-border-width input-font-color\" ng-model=\"userCtrl.user.email\" ng-pattern=\"/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/\" type=\"text\" placeholder=\"Email\"><div ng-messages=\"registerForm.email.$error\" ng-if=\"registerForm.email.$touched\" class=\"input-messages\"><div ng-message=\"required\" ng-show=\"registerForm.email.$error.required\">Please enter your email.</div><div ng-message=\"email\" ng-show=\"registerForm.email.$error.pattern\">Please enter a valid email address.</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input ng-required=\"true\" name=\"password\" class=\"input-font-color\" ng-model=\"userCtrl.user.password\" type=\"password\" ng-pattern=\"userCtrl.passwordPattern\" placeholder=\"Password\"><div ng-messages=\"registerForm.password.$error\"><div ng-message=\"required\" ng-show=\"registerForm.password.$error.required\">Please enter your password.</div><div ng-message=\"pattern\" ng-show=\"registerForm.password.$error.pattern\">{{userCtrl.passwordPatternText}}</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"confirmPassword\" class=\"input-font-color\" ng-model=\"userCtrl.user.confirmPassword\" type=\"password\" placeholder=\"Confirm Password\" match-password=\"password\"><div ng-messages=\"registerForm.confirmPassword.$error\"><div ng-message=\"required\" ng-show=\"registerForm.confirmPassword.$error.required\">Please retype the new password..</div><div ng-message=\"passwordMatch\" ng-show=\"registerForm.confirmPassword.$error.passwordMatch\">Your passwords did not match</div></div></md-input-container></div><div flex><md-input-container class=\"width-100 custom-md-input\"><input required name=\"employeeId\" class=\"no-border-width input-font-color\" ng-model=\"userCtrl.user.employeeId\" type=\"text\" placeholder=\"Employee Id\"><div ng-messages=\"registerForm.employeeId.$error\"><div ng-message=\"required\" ng-show=\"registerForm.employeeId.$error.required\">Please enter your Employee Id.</div></div></md-input-container></div><div flex layout=\"row\"><div flex=\"50\" layout=\"column\" layout-align=\"center start\"><a ui-sref=\"login\" class=\"frgt-pwd\">Back to Login</a></div><div flex=\"50\" layout=\"column\"><div flex=\"100\"><md-button ng-disabled=\"registerForm.$invalid\" class=\"md-primary custom-btn-submit text-capitalize login-btn\" type=\"submit\" ng-disabled=\"\" style=\"width: 100%\">Add Employee</md-button></div></div></div></form></md-card></div></md-content></div>")

$templateCache.put("../app/scripts/user/views/success.html","<div flex layout=\"row\" class=\"width-height-100 bg-login-img\"><md-content class=\"md-padding bg-initial landing-md-content\" flex layout=\"row\" layout-sm=\"row\" layout-xs=\"column\"><div flex=\"100\" layout-align=\"center\" flex-xs=\"60\" flex-md=\"60\" flex-sm=\"60\" flex-gt-xs=\"60\" layout=\"column\" class=\"margin-auto\"><md-card class=\"login-panel\"><md-card md-theme=\"default\" style=\"box-shadow: none\" md-theme-watch><md-card-title><md-card-title-text layout-align=\"center\"><span class=\"md-headline text-align-center\"><md-icon aria-label=\"success\" class=\"md-icon-green\">done</md-icon></span><span class=\"md-subhead green-label text-align-center\">Registration Successful</span></md-card-title-text></md-card-title><md-card-content><p class=\"success-msg\">Thank you for registering on Feazo. To complete the registration, please click the link in the email we just sent you.</p></md-card-content><div flex=\"100\" layout=\"column\" layout-align=\"center\" class=\"m-b-23\"><a ui-sref=\"login\" class=\"frgt-pwd text-align-center\">Click to Login</a></div></md-card></md-card></div></md-content></div>")
}]);
})();