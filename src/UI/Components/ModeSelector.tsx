import { Switch, Space } from "antd";
import useModeStore from "../../infrastructure/context/ModeFontStore";

function ModeSelector() {

    const { darkMode, setMode} = useModeStore((state) => state);

    return (
        <Space>
            <Switch
                checkedChildren="Oscuro"
                unCheckedChildren="Claro"
                defaultChecked={darkMode}
                onChange={setMode}
            />
        </Space>
    )
}

export default ModeSelector;