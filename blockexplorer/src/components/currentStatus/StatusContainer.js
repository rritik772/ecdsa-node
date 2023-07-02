function StatusContainer({ icon, tag, value }) {
    return (
        <div className="flex p-3 gap-3">
            {icon}
            <div className="flex flex-col">
                <span>{tag}</span>
                <pre>{value}</pre>
            </div>
        </div>
    );
}

export default StatusContainer;
