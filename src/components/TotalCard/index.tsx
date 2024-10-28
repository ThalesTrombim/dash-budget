import DynamicIcon from "../DynamicIcon";

interface IProps {
  title: string
  amount: string // ADICIONAR TRATAMENTO DE VALORES EM PORTUGUÊS
  icon: string
  iconColor?: string
}

function TotalCard({ title, amount, icon, iconColor = '656CE1' }: IProps) {

  return (
    <div className="p-4 bg-white rounded-lg min-w-[232px] gap-2 flex flex-col">
      <div className="p-2 bg-[#F0F0F5] flex w-10 rounded-lg">
        <DynamicIcon icon={icon} color={iconColor} />
      </div>

      <div className="flex flex-col items-start">
        <span className="text-[#6B7280]">
          {title}
        </span>

        <span className="text-xl font-bold">{amount}</span>
      </div>
    </div>
  )
}

export default TotalCard;