import { Card, Result } from "antd";

const NotFoundView: React.FC = () => (
    <Card className="code-box" style={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', borderRadius:0 }}>
        <Result 
            status='404'
            title='404'
            subTitle="La pagina consulta no existe."
        />
    </Card>
)

export default NotFoundView;