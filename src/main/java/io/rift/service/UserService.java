package io.rift.service;


import io.rift.model.User;
import io.rift.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getUser(Integer id) {
        return userRepository.findOne(id);
    }


}
