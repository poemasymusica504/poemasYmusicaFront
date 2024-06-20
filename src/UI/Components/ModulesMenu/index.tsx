import { Link } from "react-router-dom";
import routePaths from "../../../constants/routePaths";
import { BookOutlined, FileOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const ModulesMenu = () => {
    const style = { paddingLeft: 32 - 14 };
    const menuItems = [
        {
            label: <Link to={`${routePaths.DEFAULT_HOME}/${routePaths.AMOR}`} title="Amor">Amor</Link>,
            key: routePaths.AMOR,
            icon: <FileOutlined />,
            isShow: true,
            style
        },
        {
            label: <Link to={`${routePaths.DEFAULT_HOME}/${routePaths.VIDA}`} title="Vida">Vida</Link>,
            key: routePaths.VIDA,
            icon: <BookOutlined />,
            isShow: true,
            style
        },
    ]

    const arrayItems = menuItems
        .filter((item) => item.isShow)
        .map((item) => ({
            label:item.label,
            key:item.key,
            icon:item.icon,
        }));

    return (
        <Menu 
            mode="vertical"
            items={arrayItems}
            style={{ border: 0, margin: 0 }}
            triggerSubMenuAction="click"
        />
    )
}

export default ModulesMenu;