// Next Imports
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { getSession } from 'next-auth/react'

import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const [isAdmin, setIsAdmin] = useState(true)

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  //handle side effects
  useEffect(() => {
    getCurrentUserData()
  }, [])

  // get current user data
  async function getCurrentUserData() {
    const session = await getSession()

    setIsAdmin(session?.user?.user_type == 'admin')
  }

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuSection label={dictionary['navigation'].appsPages}>
          <SubMenu label={dictionary['navigation'].products}>
            <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/products/create`}>{dictionary['navigation'].add}</MenuItem>
            {/* <MenuItem href={`/${locale}/apps/ecommerce/products/category`}>
              {dictionary['navigation'].category}
            </MenuItem> */}
          </SubMenu>

          {isAdmin && <MenuItem href={`/${locale}/apps/categories`}>{dictionary['navigation'].categories}</MenuItem>}
          {isAdmin && <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].user}</MenuItem>}
          {isAdmin && <MenuItem href={`/${locale}/apps/tracking-map`}>{dictionary['navigation'].TrackingMAP}</MenuItem>}
          {isAdmin && <MenuItem href={`/${locale}/apps/vendors`}>{dictionary['navigation'].vendors}</MenuItem>}
          {isAdmin && <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>}

          {!isAdmin && (
            <MenuItem href={`/${locale}/apps/ecommerce/vendors-products`}>
              {dictionary['navigation'].vendors_products}
            </MenuItem>
          )}
          <MenuItem href={`/${locale}/apps/ecommerce/orders/list`}>{dictionary['navigation'].orders}</MenuItem>

          {isAdmin && <MenuItem href={`/${locale}/apps/chat`}>{dictionary['navigation'].chat}</MenuItem>}
          {isAdmin && <MenuItem href={`/${locale}/apps/settings`}>{dictionary['navigation'].settings}</MenuItem>}
        </MenuSection>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
