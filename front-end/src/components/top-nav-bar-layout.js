import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const black = { color: 'black' }

const TopNavBarLayout = props => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <Link to='/'>PicMe</Link>
        </Menu.Item>

        <Dropdown item openOnFocus simple text='Pictures'>
          <Dropdown.Menu>
            <Dropdown.Item><Link style={black} to='/'>Upload</Link></Dropdown.Item>
            <Dropdown.Item><Link style={black} to='/browse'>Browse</Link></Dropdown.Item>
            <Dropdown.Item><Link style={black} to='/'>My Uploads</Link></Dropdown.Item>
            <Dropdown.Item><Link style={black} to='/'>My Collection</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item header>
          <Link to='/billing'>Billing</Link>
        </Menu.Item>
        <Menu.Item header>
          <Link to='/'>Settings</Link>
        </Menu.Item>
      </Container>
    </Menu>

    <Container textAlign='left' style={{ marginTop: '7em' }}>
      {props.children}
    </Container>
  </div>
)

export default TopNavBarLayout
