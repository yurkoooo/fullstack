CREATE TABLE `users` (
    `id` int(11) unsigned NOT NULL auto_increment,
    `login` varchar(30) NOT NULL,
    `password` varchar(32) NOT NULL,
    `hash` varchar(32) NOT NULL default '',
    `ip` int(10) unsigned NOT NULL default '0',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;