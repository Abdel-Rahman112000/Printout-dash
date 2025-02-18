// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import RoleCards from './RoleCards'
import RolesTable from './RolesTable'
import type { Role } from '@/types/api/common/Role'

const Roles = ({ userData, roles }: { userData?: UsersType[] } & WithRoles) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
        <Typography>
          A role provided access to predefined menus and features so that depending on assigned role an administrator
          can have access to what he need
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RoleCards roles={roles} />
      </Grid>
    </Grid>
  )
}

export type WithRoles = {
  roles: Role[]
}

export default Roles
