import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Addon {
  id: number;
  name: string;
  price: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Классическая шаурма',
    description: 'Куриное мясо, свежие овощи, фирменный соус',
    price: 350,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80'
  },
  {
    id: 2,
    name: 'Говяжья шаурма',
    description: 'Говядина, маринованные огурцы, острый соус',
    price: 420,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80'
  },
  {
    id: 3,
    name: 'Фалафель шаурма',
    description: 'Хрустящий фалафель, хумус, свежие овощи',
    price: 320,
    image: 'https://images.unsplash.com/photo-1628408891486-4cce6f18b0bb?w=800&q=80'
  },
  {
    id: 4,
    name: 'Микс шаурма',
    description: 'Курица и говядина, сырный соус, овощи',
    price: 450,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80'
  }
];

const addons: Addon[] = [
  { id: 1, name: 'Сыр', price: 50 },
  { id: 2, name: 'Двойное мясо', price: 150 },
  { id: 3, name: 'Острый соус', price: 30 },
  { id: 4, name: 'Сырный соус', price: 40 },
  { id: 5, name: 'Маринованные огурцы', price: 30 }
];

export default function Index() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '' });
  const [activeSection, setActiveSection] = useState('hero');

  const handleAddonToggle = (addonId: number) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return selectedItem.price + addonsTotal;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.error('Заполните все поля формы');
      return;
    }
    toast.success('Заказ оформлен! Ожидайте звонка оператора');
    setSelectedItem(null);
    setSelectedAddons([]);
    setOrderForm({ name: '', phone: '', address: '' });
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌯</span>
              <h1 className="text-2xl font-bold text-foreground">МаксВЛавашике</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('menu')} className="text-sm font-medium hover:text-primary transition-colors">Меню</button>
              <button onClick={() => scrollToSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
            </nav>
            <Button onClick={() => scrollToSection('menu')}>
              <Icon name="ShoppingBag" size={20} />
              <span className="ml-2">Заказать</span>
            </Button>
          </div>
        </div>
      </header>

      <section id="hero" className="relative py-24 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Star" size={16} className="mr-1" />
              Бесплатная доставка от 500₽
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Самая вкусная шаурма <span className="text-primary">в городе</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Готовим из свежих продуктов с любовью. Быстрая доставка за 30 минут или бесплатно
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => scrollToSection('menu')} className="text-base">
                <Icon name="UtensilsCrossed" size={20} />
                <span className="ml-2">Смотреть меню</span>
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('delivery')}>
                Условия доставки
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наше меню</h2>
            <p className="text-muted-foreground text-lg">Выберите свою идеальную шаурму</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => {
                  setSelectedItem(item);
                  scrollToSection('order');
                }}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">{item.price}₽</span>
                    <Button size="sm" variant="outline">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedItem && (
            <div id="order" className="max-w-4xl mx-auto">
              <Card className="p-8 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} />
                  Оформление заказа
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <img src={selectedItem.image} alt={selectedItem.name} className="w-24 h-24 object-cover rounded-md" />
                      <div>
                        <h4 className="font-semibold text-lg">{selectedItem.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                        <p className="text-primary font-bold mt-2">{selectedItem.price}₽</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Добавки:</Label>
                      {addons.map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={`addon-${addon.id}`}
                              checked={selectedAddons.includes(addon.id)}
                              onCheckedChange={() => handleAddonToggle(addon.id)}
                            />
                            <Label htmlFor={`addon-${addon.id}`} className="cursor-pointer font-medium">
                              {addon.name}
                            </Label>
                          </div>
                          <span className="text-sm font-semibold">+{addon.price}₽</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-2xl text-primary">{calculateTotal()}₽</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        placeholder="Иван Иванов"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input
                        id="address"
                        placeholder="ул. Ленина, д. 1, кв. 10"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                        required
                      />
                    </div>

                    <Separator className="my-6" />

                    <Button type="submit" className="w-full" size="lg">
                      <Icon name="Check" size={20} />
                      <span className="ml-2">Оформить заказ на {calculateTotal()}₽</span>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedItem(null);
                        setSelectedAddons([]);
                      }}
                    >
                      Отменить
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      <section id="delivery" className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Доставка</h2>
            <p className="text-muted-foreground text-lg">Быстро и удобно</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">30 минут</h3>
              <p className="text-muted-foreground">Среднее время доставки. Если опоздаем — доставка бесплатно</p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Banknote" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">От 500₽</h3>
              <p className="text-muted-foreground">Бесплатная доставка при заказе от 500 рублей</p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="MapPin" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">По всему городу</h3>
              <p className="text-muted-foreground">Доставляем в любой район города без исключений</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold mb-4">О нас</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы — команда энтузиастов, влюбленных в настоящую уличную еду. Наша миссия — делать вкусную и качественную шаурму доступной каждому. 
              Используем только свежие продукты, фирменные рецепты соусов и готовим с душой.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">5+</div>
                <p className="text-sm text-muted-foreground">лет на рынке</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">50k+</div>
                <p className="text-sm text-muted-foreground">довольных клиентов</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">4.9</div>
                <p className="text-sm text-muted-foreground">средний рейтинг</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-muted-foreground text-lg">Свяжитесь с нами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <Icon name="Phone" size={32} className="mx-auto text-primary" />
              <h3 className="font-semibold">Телефон</h3>
              <p className="text-muted-foreground">+7 (999) 123-45-67</p>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <Icon name="Mail" size={32} className="mx-auto text-primary" />
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">info@maxvlavashike.ru</p>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <Icon name="MapPin" size={32} className="mx-auto text-primary" />
              <h3 className="font-semibold">Адрес</h3>
              <p className="text-muted-foreground">г. Москва, ул. Примерная, 1</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌯</span>
              <span className="font-bold text-lg">МаксВЛавашике</span>
            </div>
            <p className="text-sm opacity-80">© 2024 МаксВЛавашике. Все права защищены</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}