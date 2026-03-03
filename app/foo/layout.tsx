const FooLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) =>
    <>
        <div>Foo Layout</div>
        {children}
    </>

export default FooLayout