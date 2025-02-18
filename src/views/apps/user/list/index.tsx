// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import type { User } from '@/types/api/common/User'

const UserList = ({ userData, users }: { userData?: UsersType[]; users: User[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable users={users} tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
