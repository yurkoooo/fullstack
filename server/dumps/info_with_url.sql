-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 11 2020 г., 13:30
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `stage2_project`
--

-- --------------------------------------------------------

--
-- Структура таблицы `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `cid` int(4) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `descr_min` varchar(1024) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `info`
--

INSERT INTO `info` (`id`, `cid`, `title`, `url`, `descr_min`, `description`, `image`) VALUES
(1, 1, 'Как меня унизили в geek-shope', 'geek-shope', 'Зашел как-то после работы в магазин Geek атрибутики. На кассе нахожу Карту Мародеров из Гарри Поттера. Стою рассматриваю:', 'Зашел как-то после работы в магазин Geek атрибутики. На кассе нахожу Карту Мародеров из Гарри Поттера. Стою рассматриваю:\r\n- Это Карта Мародеров.\r\n- Да, я знаю. На ней что то проявляется/меняется?\r\nКассир на полном серьёзе:\r\n- Нет конечно. Вы же МАГЛ!', '1599657993162221197.webp'),
(2, 1, 'Маркетинг уровень \"Гарри Поттер\"', 'marketing', 'Мантия неведимка из Гарри Поттера. Стоимость 25.000$\r\n\r\n', NULL, '1599721350195723123.webp'),
(3, 1, 'ГП и ко', 'gp-ko', 'Никакой смысловой нагрузки. Просто фото моих работ\r\n', NULL, '1599597586181144142.webp'),
(4, 2, 'Это бесит', 'angry-1', 'В аптеке', NULL, '159930306711734667.jpg'),
(5, 2, 'Если кто-то бесит', 'angry-2', 'План действий', NULL, '1594813802136529252.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
