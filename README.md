## Components

- [ ] `AppShell` – Root-Layout, Tabs/Navigation
- [ ] `HomeScreen`
- [ ] `DaySwipePager` – horizontales Swipen zwischen Tagen
- [ ] `DailySummaryHeader` – Container für die zwei Kreise
- [ ] `ProgressRing` – wiederverwendbarer Kreis (Kalorien/Protein)
- [ ] `MacroBadge` – kleiner KPI/Label für Ziel/Consumed
- [ ] `FoodEntryList`
- [ ] `FoodEntryRow`
- [ ] `AddFoodFab` – Floating Action Button
- [ ] `AddFoodModal`
- [ ] `FoodSearchInput`
- [ ] `FoodSearchList`
- [ ] `FoodSearchRow`
- [ ] `FavoriteSectionHeader`
- [ ] `CreateFoodForm`
- [ ] `NumberInputRow` – generische Zahleneingabe (g, kcal/100g, protein/100g)
- [ ] `CalendarScreen`
- [ ] `MonthlyCalendar`
- [ ] `CalendarDayCell`
- [ ] `DayStatusDot` – grün/gelb/rot
- [ ] `DayDetailDrawer` (oder `DayDetailModal`)
- [ ] `FoodDatabaseScreen`
- [ ] `FoodDatabaseList`
- [ ] `FoodDatabaseRow`
- [ ] `FoodActionsMenu` – edit/delete/favorite
- [ ] `ProfileSettingsScreen`
- [ ] `GoalInputForm`
- [ ] `GoalInputRow`
- [ ] `EmptyState` – für leere Listen
- [ ] `ConfirmDialog` – für Delete

## Hilfsfunktionen / Utilities

- [ ] `calcTotalsForDay(entries)` → { calories, protein, grams }
- [ ] `calcFromPer100g({ per100, grams })`
- [ ] `calcProgress({ consumed, goal })` → 0..1
- [ ] `clamp(value, min, max)`
- [ ] `formatNumber(value)` / `formatGrams(value)`
- [ ] `getDayId(date)` → string key `YYYY-MM-DD`
- [ ] `parseDayId(id)` → Date
- [ ] `addDays(date, n)`
- [ ] `isSameDay(a,b)`
- [ ] `getDayStatus({ calories, protein, goals })` → "green"|"yellow"|"red"
- [ ] `sortFoods(favoritesFirst, searchQuery)`
- [ ] `filterFoodsByQuery(foods, query)`
- [ ] `toggleFavorite(foodId)`
- [ ] `buildFoodEntry({ foodId, grams, per100 })`
- [ ] `updateEntryAmount(entryId, grams)`
- [ ] `roundToStep(value, step)` – z.B. 5g Schritte
- [ ] `normalizeFoodInput(form)` – Zahlen/NaN/Minwerte

