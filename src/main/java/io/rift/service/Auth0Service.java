package io.rift.service;

import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Auth0Service {

    @Autowired
    private RiftRepository riftRepository;

}
