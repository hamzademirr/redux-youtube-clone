import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { Button, Input, Dropdown, Space } from 'antd';

import './style.scss';
import '../TopMenu/style.scss';

import youtubeLogo from '../../assets/Navbar/Youtube_logo.svg';
import youtubeLogoLight from '../../assets/Navbar/Youtube_logo_light.svg';
import Create from '../../assets/Navbar/Create.jsx';
import Menu from '../../assets/Navbar/Menu.jsx';
import Mic from '../../assets/Navbar/Mic.jsx';
import SearchIcon from '../../assets/Navbar/Search.jsx';
import Notifications from '../../assets/Navbar/Notifications.jsx';
import userPhoto from '../../assets/Navbar/user_photo.jpeg';

import { changeTheme, selectTheme } from '../../redux/Theme/themeSlice';
import { toggleSidebar } from '../../redux/Sidebar/sidebarSlice';

function NavBar() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [serachText, setSerchText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log(serachText);
    event.preventDefault();
    navigate(`/search?q=${serachText}`);
  };

  useEffect(() => {
    const phoneMediaQuery = window.matchMedia("(max-width: 540px)");

    const handleMediaQueryChange = (mediaQuery) => {
      setIsPhoneMode(mediaQuery.matches);
    };

    handleMediaQueryChange(phoneMediaQuery);

    const mediaQueryListener = phoneMediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQueryListener.removeListener(handleMediaQueryChange);
    };
  }, []); // Bu etkileşim sadece bir kere çalışacak, bu yüzden boş bağımlılık dizisi

  useEffect(() => {
    if (isPhoneMode) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, isPhoneMode]);

  const items = [
    {
      label: (
        <Button type="text" onClick={() => dispatch(changeTheme())}>
          Change Theme
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <>
      <navbar className={theme ? "dark" : "light"}>
        <div className="leftItem">
          <Button className="menu-button" type="text" onClick={() => dispatch(toggleSidebar())}>
            <Menu />
          </Button>
          <NavLink to="/">
            <img
              src={theme ? youtubeLogo : youtubeLogoLight}
              className="youtubeLogo"
            />
          </NavLink>
        </div>

        <div className="middleItem">
          <form className="search-form" onSubmit={handleSubmit}>
            <Input
              className="Search-Input"
              name="serach"
              onChange={(event) => setSerchText(event.target.value)}
              placeholder="Serach"
            />
            <Button
              className="Search-Button"
              htmlType="submit"
              icon={<SearchIcon />}
            />
          </form>
          <Button className="micButton" shape="circle" icon={<Mic />} />
        </div>

        <div className="rightItem">
          <div className='deneme'>
            <div>
              <Create />
            </div>
            <div>
              <Notifications />
            </div>
          </div>
          <div className="user">
            <Dropdown
              overlayClassName={
                theme
                  ? "is-dark-theme is-user-drop-menu"
                  : "is-light-theme is-user-drop-menu"
              }
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img src={userPhoto} className="userPhoto" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
