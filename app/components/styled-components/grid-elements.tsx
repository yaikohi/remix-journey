export const GridElementTR = ({ children }: any) => (
    <div className="col-start-2 row-start-1 max-h-20 ">{children}</div>
)

export const GridElementBR = ({ children, css }: any) => (
    <div className={`${css} flex col-start-2 row-start-2 text-xl`}>
        {children}
    </div>
)

export const GridElementBL = ({ children }: any) => (
    <div className="col-start-1 row-start-2">{children}</div>
)

export const GridElementBottom = ({ children }: any) => (
    <div className="col-span-2 col-start-1 row-start-2">{children}</div>
)

export const GridContainer = ({ children }: any) => (
    <div className="grid grid-cols-2">{children} </div>
)
