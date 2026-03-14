interface ContainerUIProps {
    children: React.ReactNode;
}

export const ContainerUI = ({ children }: ContainerUIProps) => {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-6">
            {children}
        </div>
    )
}