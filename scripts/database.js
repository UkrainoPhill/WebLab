export class destination {
    constructor(id, image, name, description, price, last_updated) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
        this.last_updated = last_updated;
    }
}
;
const destination1 = new destination(1, "../assets/SkadarMontenegro.svg", "Skadar", "Скадарське озеро, Шкодер — тектонічне озеро в Чорногорії та Албанії, найбільше на Балканському півострові. Називається на честь міста Шкодер в північній Албанії. Площа його поверхні може змінюватися між 370 і 530 км², з яких 2/3 знаходиться в Чорногорії.", 600, 0);
const destination2 = new destination(2, "../assets/FanjingshanChina.svg", "Fanjingshan", "Фаньцзіншань — священна гора в китайському буддизмі, яка вважається бодхімандою Будди Майтрейї. У 2018 році він став об’єктом всесвітньої спадщини ЮНЕСКО.", 500, 0);
const destination3 = new destination(3, "../assets/RajaAmpatIndonesia.svg", "Raja Ampat", "Раджа-Ампат — архіпелаг в Індонезії, що лежить біля північно-західного краю півострова Чендравасіх на острові Нова Гвінея. Архіпелаг складається з понад 1500 малих островів, рифів і мілин, що оточують чотири головні острови Місоол, Салаваті, Батанта та Вайгео, а також менший острів Кофіау.", 700, 0);
const destination4 = new destination(4, "../assets/VeveySwitzerland.svg", "Vevey", "Веве — місто Швейцарії на березі Женевського озера у франкомовному в кантоні Во, округ Рів'єра-Пеї-д'Ано.", 1000, 0);

export const data_array = [destination1, destination2, destination3, destination4];
localStorage.setItem("array", JSON.stringify(data_array));