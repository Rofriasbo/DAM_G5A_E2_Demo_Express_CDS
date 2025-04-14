using {ad.AuditDetail} from './common';

namespace rol;

entity Roles {
    key ROLEID      : String(200);
        ROLENAME    : String(200);
        DESCRIPTION : String(200);
        DETAIL_ROW  : Composition of one AuditDetail;
        PRIVILEGES  : Association to many RolePrivileges on PRIVILEGES.ROLEID = ROLEID;
}

entity RolePrivileges {
    key ID          : UUID;
        ROLEID      : String(200);
        PROCESSID   : String(200);
        PRIVILEGEID : String(200);
}


entity UserRoles {
    key USERID : String(200);
    key ROLEID : Association to Roles;
}