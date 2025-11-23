import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";
interface Props {
    tittle: string;
    description: string;
    image ?: string

}
export const EmptyState = ({
    tittle,
    description,
    image = "/empty.svg"
}: Props) => {

    return (
        <div className=" flex flex-col items-center justify-center">
                <Image  src={image} alt="empty" width={240} height={240}/>
                <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
                    <h6 className="text-lg font-medium">{tittle}</h6>
                    <p className="text-sm"> {description}</p>
                </div>
            </div>
        
    )
}