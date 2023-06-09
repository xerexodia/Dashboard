// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import DashContext, { useStateContext } from 'context/authContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const { user } = useStateContext();
    return (
        <DashContext>
            <ThemeCustomization>
                <ScrollTop>
                    <Routes />
                </ScrollTop>
            </ThemeCustomization>
        </DashContext>
    );
};

export default App;
