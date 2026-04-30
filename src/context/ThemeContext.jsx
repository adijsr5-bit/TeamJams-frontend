import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultSettings = {
    restaurantName: 'The Fig & Olive',
    logoUrl: '',
    themeColor: '#7b8c5a', // Luxury Olive Green
    address: '13-15 Castle Street, Douglas, IM1 2EX',
    contactEmail: 'contact@thefigandolive.com',
    contactPhone: '01624 626003',
    aboutUsText: 'Born from the vision of a dreamer from Greece, The Fig & Olive brings the Mediterranean spirit to the Isle of Man. Our amazing team have created a menu without geographical restrictions, marrying classic Mediterranean, Asian and international flavours for the most imaginative and unexpected dishes.',
    aboutUsSection1: 'On our menu you will find old favourites from when we began all those years ago alongside new seasonal dishes and specials from the new ingredients that are delivered daily into our kitchen.\n\nOur menu changes regularly following the seasons and is alive with sunbaked tastes and aromas, radiating all the colours and textures of the sea and the land, and brimming with the mood of the Med.\n\nEvery dish is cooked to order. We are not fussy, just skilled, imaginative and full of the unexpected.\n\nOur mission is to delight and surprise and ensure everybody walks out with a smile on their face, wondering when they can do it all again!',
    aboutUsSection2: 'Whether it’s a romantic dinner for two or a larger group, The Fig & Olive has so much to offer including our à la carte menu, young guest menu, lunch and brunch menus, dedicated vegan menu, gluten free and vegetarian options, blackboard specials and bespoke party menus. This ensures there is something for every budget.\n\nIn addition, the expertly chosen wine list offers exceptional value with a wide selection of wines, with several available to purchase by the glass.\n\nWe also have a wide range of trendy cocktails, premium spirits, Davison’s Manx ice cream and a homemade dessert menu to die for!!!'
  };

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) {
          setSettings(res.data);
          // Dynamically update CSS variables
          document.documentElement.style.setProperty('--primary-color', res.data.themeColor);
          document.title = res.data.restaurantName;
        }
      } catch (error) {
        console.warn('Backend unavailable. Using default theme settings for demo.');
        setSettings(defaultSettings);
        document.documentElement.style.setProperty('--primary-color', defaultSettings.themeColor);
        document.title = defaultSettings.restaurantName;
      }
    };
    fetchSettings();
  }, []);

  return (
    <ThemeContext.Provider value={{ settings, setSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
