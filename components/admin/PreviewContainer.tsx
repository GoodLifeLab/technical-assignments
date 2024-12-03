interface PreviewContainerProps {
  children: React.ReactNode
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  children,
}) => {
  return (
    <div className="h-[350px] w-[480px] overflow-hidden rounded-2xl border border-btl-grayscale-0 bg-gradient-to-b from-[#FFFFFF] to-[#F7F8FF] shadow-primary">
      {children}
    </div>
  )
}
