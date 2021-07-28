import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function Navbar() {
  const {pathname} = useLocation();  
  const [activeTab, setActiveTab] = useState(pathname.split('/')[1])

  const handleItemClick = (e, { name }) => setActiveTab(name)
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
  }

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/home"
            name='home'
            active={activeTab === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/game"
            name='game'
            active={activeTab === 'game'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/profile"
            name='profile'
            active={activeTab === 'profile'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to="/login"
              name='logout'
              active={activeTab === 'logout'}
              onClick={handleLogout}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
}


