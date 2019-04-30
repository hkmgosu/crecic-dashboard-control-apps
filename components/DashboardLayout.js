import Header from './Header'

const DashboardLayout = props => (
    <div>
        <Header />
        {props.children}
    </div>
)

export default DashboardLayout