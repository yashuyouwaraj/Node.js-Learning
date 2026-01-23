


// -> unique identifier for storing and retriving role requirments as metadata on route handlers

import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../entities/user.entity"

export const ROLES_KEY = 'roles'

// -> roles decorator markes the routes with the roles that are allowed to access them
// -> roles guard will later reads this metadata to check if the user has permission

export const Roles = (...roles:UserRole[]) => SetMetadata(ROLES_KEY,roles)