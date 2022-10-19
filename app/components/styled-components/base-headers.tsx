export const BaseHeader = ({ children, css }: any) => (
    <h1 className={`${css} font-bold text-2xl text-ctp-text`}>{children}</h1>
)
export const BaseHeaderHero = ({ children, css }: any) => (
    <h1 className={`${css} font-bold text-7xl text-ctp-text`}>{children}</h1>
)

export const BaseHeader2 = ({ children }: any) => (
    <h2 className="text-4xl">{children}</h2>
)

export const BaseHeader3 = ({ children }: any) => <h3 className="text-xl font-bold capitalize">{children}</h3>

export const BaseHeader4 = ({ children }: any) => <h4>{children}</h4>

export const BaseHeader5 = ({ children }: any) => <h5>{children}</h5>
