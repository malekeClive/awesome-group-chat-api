-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2020 at 09:58 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `group_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `room_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `description` varchar(100) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'member');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_name` varchar(30) DEFAULT NULL,
  `member` int(100) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_name`, `member`, `created_at`) VALUES
(5, 'sebat', 10, '2020-09-18 14:56:39.591206'),
(6, 'casssa coffee gang', 10, '2020-09-18 15:02:04.751995'),
(8, 'nongkuy', 5, '2020-09-18 15:53:29.545940'),
(9, 'sekut', 5, '2020-09-25 12:59:33.260480'),
(13, 'melcem debu', 10, '2020-09-25 15:34:19.076555'),
(16, 'kopdar', 10, '2020-09-28 15:05:27.838374'),
(17, 'ngobar', 10, '2020-09-28 15:07:30.477949'),
(18, 'cilacap bersatu', 10, '2020-09-29 16:04:33.108861'),
(33, 'aremania', 10, '2020-10-24 04:30:26.589760'),
(53, 'anyeong', 10, '2020-11-03 04:14:37.023285');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(3, 'clive', 'clive@gmail.com', '1234qwer', '2020-09-18 14:29:48.110020'),
(4, 'john', 'john@gmail.com', '1234qwer', '2020-09-18 14:29:48.110020'),
(5, 'jane', 'jane@gmail.com', '1234qwer', '2020-09-18 14:29:48.110020'),
(6, 'foo', 'foo@gmail.com', '1234qwer', '2020-09-18 14:29:48.110020'),
(7, 'foobar', 'foobar@gmail.com', '1234qwer', '2020-09-18 14:29:48.110020'),
(11, 'paguyuban', 'clive23@gmail.com', '1234qwer', '2020-10-19 03:55:35.006030'),
(16, 'memento', 'memento@gmail.com', '1234qwer', '2020-10-23 03:12:01.913410'),
(17, 'memento1', 'memento23@gmail.com', '1234qwer', '2020-10-23 03:15:04.782068'),
(18, 'memento2', 'memento235@gmail.com', '1234qwer', '2020-10-26 01:55:07.128845'),
(19, 'anjay', 'anjay@gmail.com', '1234qwer', '2020-10-27 03:10:29.346020'),
(20, 'anjay', 'anjay', '1234qwer', '2020-10-27 03:21:41.781639'),
(21, 'anjayani', 'anjayani@gmail.com', '1234qwer', '2020-10-27 03:28:07.094265'),
(22, 'kon', 'kon@gmail.com', '1234qwer', '2020-10-27 03:45:50.134369'),
(23, 'tolol', 'tolol@gmail.com', 'aa123', '2020-10-27 03:52:54.826278');

-- --------------------------------------------------------

--
-- Table structure for table `user_room_role`
--

CREATE TABLE `user_room_role` (
  `user_id` int(3) DEFAULT NULL,
  `room_id` int(3) DEFAULT NULL,
  `role_id` int(3) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_room_role`
--

INSERT INTO `user_room_role` (`user_id`, `room_id`, `role_id`, `created_at`) VALUES
(3, 5, 1, '2020-09-18 14:56:39.729451'),
(4, 5, 2, '2020-09-18 14:56:39.729451'),
(3, 6, 1, '2020-09-18 15:02:05.211885'),
(4, 6, 2, '2020-09-18 15:02:05.211885'),
(4, 8, 1, '2020-09-18 15:53:29.627687'),
(4, 9, 1, '2020-09-25 12:59:33.339087'),
(3, 13, 1, '2020-09-25 15:34:19.091990'),
(3, 16, 1, '2020-09-28 15:05:27.986357'),
(3, 17, 1, '2020-09-28 15:07:30.671801'),
(5, 18, 1, '2020-09-29 16:04:33.327796'),
(4, 13, 2, '2020-10-19 17:00:00.000000'),
(4, 17, 2, '2020-10-20 02:15:56.759462'),
(4, 16, 2, '2020-10-20 08:25:29.214222'),
(3, 33, 1, '2020-10-24 04:30:26.606644'),
(NULL, NULL, NULL, '2020-10-24 04:41:46.193881'),
(3, 9, 2, '2020-10-24 04:50:53.605038'),
(3, 53, 1, '2020-11-03 04:14:37.037806');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `fk_room` (`room_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_room_role`
--
ALTER TABLE `user_room_role`
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_role_id` (`role_id`),
  ADD KEY `fk_room_id` (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_room_role`
--
ALTER TABLE `user_room_role`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
