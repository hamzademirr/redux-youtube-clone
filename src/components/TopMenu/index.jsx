import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import './style.scss';

import { selectTheme } from '../../redux/Theme/themeSlice';

function TopMenu() {
  const theme = useSelector(selectTheme);
  return (
    <>
      <div>
        <div className={theme ? "dark top-menu" : "light top-menu"}>
          <Button type="link" shape="round">
            All
          </Button>
          <Button type="link" shape="round">
            Music
          </Button>
          <Button type="link" shape="round">
            Sitcoms
          </Button>
          <Button type="link" shape="round">
            Live
          </Button>
          <Button type="link" shape="round">
            Series
          </Button>
          <Button type="link" shape="round">
            Football
          </Button>
          <Button type="link" shape="round">
            Latest Uploads
          </Button>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
