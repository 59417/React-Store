import React, { useMemo } from 'react';
import Header from 'components/Header'; 

const Layout = (props) => {

    const user = useMemo(() => {
        return global.auth.getUser() || {};  // 無token時返回 null (Header報錯) >>> falsy 返回 {}
    }, []);

    return (
        <div className="main">
            <Header user={user} />
            {props.children}
        </div>
    );
};

export default Layout;